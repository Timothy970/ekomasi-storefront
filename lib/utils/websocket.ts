
export type WebSocketEvents = {
  onMessage?: (data: any) => void;
  onOpen?: () => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (event: Event) => void;
};

const BASE_WS_URL = process.env.NEXT_PUBLIC_WS_BASE_URL || "ws://localhost:8009/ws";

export function connectWebSocket(
  params: Record<string, string>,
  events: WebSocketEvents = {}
) {
  if (typeof window === "undefined") {
    return null;
  }

  const urlParams = new URLSearchParams(params).toString();
  const fullUrl = `${BASE_WS_URL}?${urlParams}`;

  const ws = new WebSocket(fullUrl);

  ws.onopen = () => {
    console.log("WebSocket connection opened");
    events.onOpen?.();
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      events.onMessage?.(data);
    } catch (err) {
      console.error("Failed to parse WebSocket message", err);
    }
  };

  ws.onerror = (event) => {
    console.error("WebSocket error observed:", event);
    events.onError?.(event);
  };

  ws.onclose = (event) => {
    events.onClose?.(event);
  };

  return {
    ws,
    send: (data: any) => ws.send(JSON.stringify(data)),
    close: () => ws.close(),
  };
}
