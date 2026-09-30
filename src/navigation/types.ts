import { NavigatorScreenParams } from '@react-navigation/native';

export type RecordsStackParamList = {
  RecordsList: undefined;
  InspectionDetails: { inspectionId: string };
};

export type InspectionStackParamList = {
  InspectionForm: undefined;
  Review: undefined;
};

export type RootTabParamList = {
  Home: undefined;
  NewInspection: NavigatorScreenParams<InspectionStackParamList>;
  Records: NavigatorScreenParams<RecordsStackParamList>;
};