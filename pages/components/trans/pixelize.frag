varying vec2 vFilterCoord;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uTrans;

uniform float progress;

uniform int splitX;
uniform int splitY;
uniform int steps;

void main() {
  float d = min(progress, 1.0 - progress);
  float dist = steps > 0 ? ceil(d * float(steps)) / float(steps) : d;
  vec2 squareSize = 2.0 * dist / vec2(splitX, splitY);

  vec2 p = dist > 0.0 ?
    (floor(vFilterCoord / squareSize) + 0.5) * squareSize:
    vFilterCoord;

  gl_FragColor = mix(
    texture2D(uSampler, p),
    texture2D(uTrans, p),
    progress);
}