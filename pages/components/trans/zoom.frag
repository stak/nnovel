varying vec2 vFilterCoord;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uTrans;

uniform float progress;

uniform float zoomEnd;
uniform float fadeStart;

vec2 zoom(vec2 uv, float amount) {
  return 0.5 + ((uv - 0.5) * (1.0 - amount));	
}

void main() {
  gl_FragColor = mix(
    texture2D(uSampler, zoom(vTextureCoord, smoothstep(0.0, zoomEnd, progress))),
    texture2D(uTrans, vFilterCoord),
    smoothstep(fadeStart, 1.0, progress)
  );
}