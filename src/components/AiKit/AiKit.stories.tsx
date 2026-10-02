import type { Meta, StoryObj } from '@storybook/react-vite';
import { ApprovalCard, ThinkingSteps, ContextMeter, AutonomyPicker, SourcedAnswer, Cite } from './AiKit';

const meta = { title: 'Blocks/AI patterns', parameters: { layout: 'centered' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Approval: Story = { render: () => <ApprovalCard title="How should I reply to the customer?" options={[
  { id: 'a', label: 'Reply now with a workaround', hint: 'Unblocks them today, the fix ships later' },
  { id: 'b', label: 'Wait for the fix to ship Thursday', hint: 'The patch is already in review' },
  { id: 'c', label: 'Escalate to engineering', hint: 'Loops the on-call engineer into the thread' }]} /> };
export const Thinking: Story = { render: () => <ThinkingSteps steps={[
  { label: 'Reading the support thread', detail: 'Ticket #4821', seconds: 0.6, state: 'done' },
  { label: 'Checking the changelog', detail: 'Last 2 releases', seconds: 0.9, state: 'done' },
  { label: 'Pulling account status', state: 'running' },
  { label: 'Drafting a reply', state: 'todo' }]} /> };
export const Meter: Story = { render: () => <ContextMeter used={132000} total={200000} /> };
export const MeterFull: Story = { render: () => <ContextMeter used={188000} total={200000} /> };
export const Autonomy: Story = { render: () => <AutonomyPicker /> };
export const Sourced: Story = { render: () => <SourcedAnswer sources={[{ id: '1', name: 'Support thread' }, { id: '2', name: 'Changelog' }]}>The outage began after Tuesday's release.<Cite n={1} /> A fix is already in review and ships Thursday.<Cite n={2} /></SourcedAnswer> };
