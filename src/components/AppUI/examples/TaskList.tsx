import { PhoneFrame } from '../PhoneFrame';
import { AppBar } from '../AppBar';
import { TaskCard } from './data';

/** Checklist card with a filter and titled sections of checkboxes. */
export function TaskListExample() {
  return (
    <PhoneFrame>
      <AppBar title="Today" large />
      <TaskCard />
    </PhoneFrame>
  );
}
