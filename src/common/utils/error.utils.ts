export function formatMessage(message?: string | string[]) {
  if (!Array.isArray(message)) return message;

  if (message.length === 1) return message[0];
  if (message.length === 2) return `${message[0]} and ${message[1]}`;

  return `${message.slice(0, -1).join(', ')} and ${message.at(-1)}`;
}
