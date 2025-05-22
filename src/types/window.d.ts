// Déclaration pour les fonctions globales de test Leaflet
interface Window {
  testLeafletMap?: Function;
  leafletDiagnostics?: {
    diagnoseMap: Function;
    testTileLoadPerformance: Function;
    runDiagnostics: Function;
  };
}

declare global {
  interface Window {
    testLeafletMap?: Function;
    leafletDiagnostics?: {
      diagnoseMap: Function;
      testTileLoadPerformance: Function;
      runDiagnostics: Function;
    };
  }
}
