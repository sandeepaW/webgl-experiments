var Program = {

  /**
  * Utilitary function that allows to set up the shaders (program) using an embedded script (look at the beginning of this source code)
  */
  getShader : function(gl, id) {
    var script = document.getElementById(id);
    if (!script) return null;

    var str = "";
    var k = script.firstChild;
    
    while (k)
    {
      if (k.nodeType == 3) str += k.textContent;
      k = k.nextSibling;
    }

    var shader;
    if (script.type == "x-shader/x-fragment")
    {
      shader = gl.createShader(gl.FRAGMENT_SHADER);
    }
    else if (script.type == "x-shader/x-vertex")
    {
      shader = gl.createShader(gl.VERTEX_SHADER);
    }
    else
    {
      return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    {
      console.log(gl.getShaderInfoLog(shader));
      return null;
    }
    return shader;
  },

  /**
  * The program contains a series of instructions that tell the Graphic Processing Unit (GPU)
  * what to do with every vertex and fragment that we pass it. 
  * The vertex shader and the fragment shader together are called the program.
  */
  load : function() {
    
    var fragmentShader          = Program.getShader(gl, "shader-fs");
    var vertexShader            = Program.getShader(gl, "shader-vs");

    prg = gl.createProgram();
    gl.attachShader(prg, vertexShader);
    gl.attachShader(prg, fragmentShader);
    gl.linkProgram(prg);

    if (!gl.getProgramParameter(prg, gl.LINK_STATUS))
    {
      console.log("Could not initialise shaders");
    }

    gl.useProgram(prg);

    prg.aVertexPosition  = gl.getAttribLocation(prg, "aVertexPosition");
    prg.aVertexNormal    = gl.getAttribLocation(prg, "aVertexNormal");

    prg.uNMatrix         = gl.getUniformLocation(prg, "uNMatrix");
    prg.uMVMatrix        = gl.getUniformLocation(prg, "uMVMatrix");
    prg.uPMatrix         = gl.getUniformLocation(prg, "uPMatrix");

    prg.uLightDirection   = gl.getUniformLocation(prg, "uLightDirection");
    prg.uLightDiffuse     = gl.getUniformLocation(prg, "uLightDiffuse");
    prg.uMaterialDiffuse  = gl.getUniformLocation(prg, "uMaterialDiffuse");
  }
}