import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChatCard, ContributionCard, MilestoneCard, NavCards, PayoutCard, QrCard, ShowcaseCard } from './Blocks';

const meta = { title: 'Blocks/Dashboard', parameters: { layout: 'centered' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Chat: Story = { render: () => <ChatCard /> };
export const Milestone: Story = { render: () => <MilestoneCard /> };
export const Qr: Story = { render: () => <QrCard /> };
export const Payout: Story = { render: () => <PayoutCard /> };
export const Navigation: Story = { render: () => <NavCards /> };
export const Showcase: Story = { render: () => <ShowcaseCard /> };
export const Contribution: Story = { render: () => <ContributionCard /> };
