// Author: Gaëtan Renaudeau
// License: MIT
// Ported: Shutaro Takimoto

varying vec2 vFilterCoord;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uTrans;

uniform float progress;
uniform bool stayFore;
uniform bool stayBack;
const vec2 direction = $0;

void main() {
  vec2 p = vFilterCoord + progress * sign(direction);
  vec2 f = fract(p);
  gl_FragColor = mix(
    texture2D(uTrans, stayBack ? vFilterCoord : f),
    texture2D(uSampler, stayFore ? vTextureCoord : f),
    step(0.0, p.y) * step(p.y, 1.0) * step(0.0, p.x) * step(p.x, 1.0)
  );
}
