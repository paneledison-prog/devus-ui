import { PhoneFrame } from '../PhoneFrame';
import { LiquidChatDemo } from '../../LiquidChat/LiquidChat';

/** "Liquid glass chat": an iOS-style messenger in the Liquid Glass look (inbox with the circle ribbon, chats, compose, photo viewer) in the phone frame. */
export function LiquidChatExample() {
  return (
    <PhoneFrame bare height={692}>
      <LiquidChatDemo embedded />
    </PhoneFrame>
  );
}
