import { NavigatorScreenParams } from '@react-navigation/native';

// Écrans du stack Records, avec les paramètres qu'ils reçoivent
export type RecordsStackParamList = {
  RecordsList: undefined;                     // aucun paramètre
  InspectionDetails: { inspectionId: string }; // reçoit l'id de l'inspection
};

// Les 3 onglets
export type RootTabParamList = {
  Home: undefined;
  NewInspection: undefined;
  Records: NavigatorScreenParams<RecordsStackParamList>;
};