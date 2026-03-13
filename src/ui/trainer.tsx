import { TrainerControlsProvider } from "@/store/trainer-controls/provider";
import TrainerControls from "./trainer-controls";
import TrainerSectors from "./trainer-sectors";
import styles from './trainer.module.css';

export default function Trainer() {
  return (
    <div className={styles.trainer}>
      <TrainerControlsProvider>
        <TrainerControls />
        <TrainerSectors />
      </TrainerControlsProvider>
    </div>
  );
}