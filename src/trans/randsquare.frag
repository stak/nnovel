varying vec2 vFilterCoord;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uTrans;

uniform float progress;

uniform int splitX;
uniform int splitY;
uniform float smoothness;
 
float rand (vec2 co) {
  return fract(sin(dot(co.xy ,vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  float r = rand(floor(vec2(splitX, splitY) * vFilterCoord));
  float m = smoothstep(0.0, -smoothness, r - (progress * (1.0 + smoothness)));
  gl_FragColor = mix(
    texture2D(uSampler, vTextureCoord),
    texture2D(uTrans, vFilterCoord),
    m);
}
