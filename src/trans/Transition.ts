import {
  Sprite,
  Filter,
  systems,
  RenderTexture,
  TextureMatrix,
  Matrix,
} from 'pixi.js'

type Shader = {
  vert: string
  frag: string
}

export class Transition extends Filter {
  private transSprite: Sprite
  private transMatrix: Matrix

  constructor(sprite: Sprite, shader: Shader) {
    const transMatrix = new Matrix()

    super(shader.vert, shader.frag, {
      progress: {
        type: '1f',
        value: 0,
      },
    })

    this.transSprite = sprite
    this.transMatrix = transMatrix
  }

  apply(
    filterManager: systems.FilterSystem,
    input: RenderTexture,
    output: RenderTexture,
    clearMode: boolean
  ) {
    const transSprite = this.transSprite
    const tex = transSprite.texture

    if (!tex.valid) {
      return
    }
    if (!tex.uvMatrix) {
      // margin = 0.0, let it bleed a bit, shader code becomes easier
      // assuming that atlas textures were made with 1-pixel padding
      tex.uvMatrix = new TextureMatrix(tex, 0.0)
    }
    tex.uvMatrix.update()

    this.uniforms.uTrans = tex
    // get _normalized sprite texture coords_ and convert them to _normalized atlas texture coords_ with `prepend`
    this.uniforms.otherMatrix = filterManager
      .calculateSpriteMatrix(this.transMatrix, transSprite)
      .prepend(tex.uvMatrix.mapCoord)

    filterManager.applyFilter(this, input, output, clearMode)
  }
}
