import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  initializeFirestore, 
  persistentLocalCache, 
  persistentMultipleTabManager,
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
  writeBatch
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { Project } from './types';
import { defaultDemoProjects } from './utils/audioCalculator';

// 1. Inicializa o Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// 2. Inicializa o Firestore com Cache Persistente Multi-Aba (IndexedDB) para funcionamento 100% Offline
let firestoreDb: ReturnType<typeof initializeFirestore>;

try {
  firestoreDb = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager()
    })
  }, firebaseConfig.firestoreDatabaseId || '(default)');
} catch {
  firestoreDb = initializeFirestore(app, {}, firebaseConfig.firestoreDatabaseId || '(default)');
}

export const db = firestoreDb;
export const projectsCollection = collection(db, 'projects');

// Fallback / Cache LocalStorage Keys
const LOCAL_FALLBACK_KEY = 'melo_mix_master_projects_v3';

// Salva e sincroniza um lote de projetos no Firestore
export async function syncProjectsToFirebase(projects: Project[]) {
  // Salva no LocalStorage imediatamente para garantir cópia síncrona
  try {
    localStorage.setItem(LOCAL_FALLBACK_KEY, JSON.stringify(projects));
  } catch (e) {
    console.warn('[Storage] Erro ao salvar cópia local:', e);
  }

  // Envia para o Firestore (se estiver offline, o Firestore guarda no IndexedDB e sincroniza quando a internet voltar)
  try {
    const batch = writeBatch(db);
    for (const project of projects) {
      if (!project.id) continue;
      const docRef = doc(db, 'projects', project.id);
      
      // Limpeza de campos undefined para compatibilidade com o Firestore
      const cleanData = JSON.parse(JSON.stringify({
        ...project,
        updatedAt: new Date().toISOString()
      }));
      
      batch.set(docRef, cleanData, { merge: true });
    }
    await batch.commit();
  } catch (err) {
    console.warn('[Firebase] Escrita em cache offline do Firestore:', err);
  }
}

// Salva um único projeto
export async function saveSingleProjectToFirebase(project: Project) {
  try {
    const docRef = doc(db, 'projects', project.id);
    const cleanData = JSON.parse(JSON.stringify({
      ...project,
      updatedAt: new Date().toISOString()
    }));
    await setDoc(docRef, cleanData, { merge: true });
  } catch (err) {
    console.warn('[Firebase] Escrita de projeto único em cache local:', err);
  }
}

// Exclui um projeto do Firestore
export async function deleteProjectFromFirebase(projectId: string) {
  try {
    const docRef = doc(db, 'projects', projectId);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn('[Firebase] Exclusão em cache offline:', err);
  }
}

// Listener em tempo real com suporte a Offline
export function subscribeToProjects(
  onProjectsChange: (projects: Project[], isFromCache: boolean) => void,
  onError?: (error: Error) => void
) {
  return onSnapshot(
    projectsCollection,
    { includeMetadataChanges: true },
    (snapshot) => {
      const isFromCache = snapshot.metadata.fromCache;
      
      if (snapshot.empty) {
        // Se o banco estiver vazio na primeira inicialização, carrega os projetos demo ou do localStorage
        let localData: Project[] = defaultDemoProjects;
        try {
          const raw = localStorage.getItem(LOCAL_FALLBACK_KEY);
          if (raw) {
            localData = JSON.parse(raw);
          }
        } catch {
          localData = defaultDemoProjects;
        }

        // Se realmente não tiver nada, semeia no Firebase
        if (localData && localData.length > 0) {
          syncProjectsToFirebase(localData);
          onProjectsChange(localData, isFromCache);
        }
        return;
      }

      const projectsList: Project[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as Project;
        projectsList.push({
          ...data,
          id: docSnap.id
        });
      });

      // Ordena por data ou prioridade
      projectsList.sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime());

      // Atualiza o backup de segurança do localStorage
      try {
        localStorage.setItem(LOCAL_FALLBACK_KEY, JSON.stringify(projectsList));
      } catch (e) {
        console.warn('[Storage] Erro ao salvar espelho do Firestore no LocalStorage:', e);
      }

      onProjectsChange(projectsList, isFromCache);
    },
    (err) => {
      console.warn('[Firebase Snapshot Error - Usando LocalStorage]', err);
      if (onError) onError(err);
      
      // Fallback em caso de erro extremo
      try {
        const raw = localStorage.getItem(LOCAL_FALLBACK_KEY);
        if (raw) {
          onProjectsChange(JSON.parse(raw), true);
        }
      } catch {
        onProjectsChange(defaultDemoProjects, true);
      }
    }
  );
}
