export interface dialogInterface {
  title: string;
  content: string;
  confirm?: () => void;
  cancel?: () => void;
}
