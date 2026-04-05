import { Node, Edge } from './nodes';

// Image cache — load once, reuse
const imageCache = new Map<string, HTMLImageElement>();

function getImage(src: string): HTMLImageElement | null {
  if (imageCache.has(src)) {
    const img = imageCache.get(src)!;
    return img.complete ? img : null;
  }
  const img = new Image();
  img.src = src;
  imageCache.set(src, img);
  return null;
}

function drawPhotoCircle(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, radius: number,
  image: HTMLImageElement | null,
  selected: boolean
) {
  // Gold border
  ctx.beginPath();
  ctx.arc(x, y, radius + 3, 0, Math.PI * 2);
  ctx.strokeStyle = selected ? '#c8943e' : 'rgba(200, 148, 62, 0.4)';
  ctx.lineWidth = selected ? 4 : 2;
  ctx.stroke();

  if (selected) {
    ctx.shadowColor = '#c8943e';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(x, y, radius + 3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  // Photo circle
  if (image) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.clip();
    const size = radius * 2;
    ctx.drawImage(image, x - radius, y - radius, size, size);
    ctx.restore();
  } else {
    // Placeholder
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#1a1816';
    ctx.fill();
  }
}

function drawLabel(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  text: string, fontSize: number, color: string
) {
  ctx.fillStyle = color;
  ctx.font = `600 ${fontSize}px system-ui, -apple-system, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(text, x, y);
}

function drawStatusDot(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  status: string
) {
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, Math.PI * 2);
  ctx.fillStyle = status === 'ACTIVE' ? '#4a7c59' : '#c8943e';
  ctx.fill();
}

export default function CanvasRenderer(
  ctx: CanvasRenderingContext2D,
  nodes: Node[],
  edges: Edge[],
  transform: { x: number; y: number; k: number },
  frameCount: number
) {
  ctx.save();
  ctx.translate(transform.x, transform.y);
  ctx.scale(transform.k, transform.k);

  const scale = transform.k;

  // --- EDGES ---
  edges.forEach(edge => {
    const source = nodes.find(n => n.id === edge.source);
    const target = nodes.find(n => n.id === edge.target);
    if (!source || !target) return;

    ctx.beginPath();

    // Curved bezier
    const midX = (source.x + target.x) / 2;
    const midY = (source.y + target.y) / 2 - 40;
    ctx.moveTo(source.x, source.y);
    ctx.quadraticCurveTo(midX, midY, target.x, target.y);

    if (edge.type === 'flywheel') {
      ctx.strokeStyle = 'rgba(200, 148, 62, 0.35)';
      ctx.lineWidth = 2 / scale;
      ctx.setLineDash([8 / scale, 6 / scale]);
      ctx.lineDashOffset = -(frameCount * 0.5);
    } else {
      ctx.strokeStyle = 'rgba(60, 60, 60, 0.5)';
      ctx.lineWidth = 1.5 / scale;
      ctx.setLineDash([]);
    }

    ctx.stroke();
    ctx.setLineDash([]);
  });

  // --- NODES ---
  nodes.forEach(node => {
    const img = getImage(node.photo);

    if (scale < 0.6) {
      // Level 1: small circles + labels
      const radius = 30;
      drawPhotoCircle(ctx, node.x, node.y, radius, img, false);
      drawLabel(ctx, node.x, node.y + radius + 8, node.label, 11, '#e8e4de');
      drawLabel(ctx, node.x, node.y + radius + 22, node.metric, 9, '#8a8074');
      drawStatusDot(ctx, node.x + radius - 4, node.y - radius + 4, node.status);

    } else if (scale < 1.5) {
      // Level 2: expanded cards
      const cardW = 180;
      const cardH = 120;
      const cx = node.x - cardW / 2;
      const cy = node.y - cardH / 2;

      // Card background
      ctx.fillStyle = 'rgba(26, 24, 22, 0.9)';
      ctx.beginPath();
      ctx.roundRect(cx, cy, cardW, cardH, 8);
      ctx.fill();
      ctx.strokeStyle = 'rgba(200, 148, 62, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Photo
      if (img) {
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(cx, cy, cardW, 60, [8, 8, 0, 0]);
        ctx.clip();
        ctx.drawImage(img, cx, cy, cardW, 60);
        ctx.restore();
      }

      // Text
      drawLabel(ctx, node.x, cy + 68, node.label, 11, '#e8e4de');
      drawLabel(ctx, node.x, cy + 82, node.metric, 9, '#c8943e');
      drawLabel(ctx, node.x, cy + 96, node.description.slice(0, 40) + '...', 8, '#6b635a');
      drawStatusDot(ctx, cx + cardW - 10, cy + 10, node.status);

    } else {
      // Level 3+: larger detail cards
      const cardW = 280;
      const cardH = 200;
      const cx = node.x - cardW / 2;
      const cy = node.y - cardH / 2;

      ctx.fillStyle = 'rgba(26, 24, 22, 0.95)';
      ctx.beginPath();
      ctx.roundRect(cx, cy, cardW, cardH, 12);
      ctx.fill();
      ctx.strokeStyle = 'rgba(200, 148, 62, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      if (img) {
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(cx, cy, cardW, 100, [12, 12, 0, 0]);
        ctx.clip();
        ctx.drawImage(img, cx, cy, cardW, 100);
        ctx.restore();
      }

      drawLabel(ctx, node.x, cy + 110, node.label, 14, '#e8e4de');
      drawLabel(ctx, node.x, cy + 130, node.metric, 11, '#c8943e');
      drawLabel(ctx, node.x, cy + 148, node.description, 10, '#8a8074');
      drawStatusDot(ctx, cx + cardW - 14, cy + 14, node.status);
    }
  });

  ctx.restore();
}
