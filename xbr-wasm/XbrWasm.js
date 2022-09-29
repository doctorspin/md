// Copyright (c) 2020 Maximillian Laumeister. More info: https://www.maxlaumeister.com/xbr-wasm/
class XbrWasm{constructor(t,s,e){if(e||(e={}),e.trY||(e.trY=48/255),e.trU||(e.trU=48/255),e.trV||(e.trV=48/255),e.algorithm||(e.algorithm="xbr"),this.options=e,this.srcElement=t,this.srcElementType=t.nodeName.toLowerCase(),this.srcElementLastTime=-1,"canvas"===this.srcElementType)this.srcCanvas=t,this.srcCanvasCtx=this.srcCanvas.getContext("2d");else{if("img"!==this.srcElementType&&"video"!==this.srcElementType)throw"XbrWasm: Unsupported Element Type. Valid types: 'canvas', 'img', 'video'";{this.srcCanvas=document.createElement("canvas"),this.srcCanvasCtx=this.srcCanvas.getContext("2d");const s="img"===this.srcElementType?this.srcElement.naturalWidth:this.srcElement.videoWidth,e="img"===this.srcElementType?this.srcElement.naturalHeight:this.srcElement.videoHeight;this.srcCanvas.width=s,this.srcCanvas.height=e,this.srcCanvasCtx.drawImage(t,0,0)}}this.instanceId=XbrWasm.instanceCount,XbrWasm.instanceCount+=1,this.scalingFactor=s,this.destCanvas=document.createElement("canvas"),this.destCanvas.width=this.srcCanvas.width*s,this.destCanvas.height=this.srcCanvas.height*s,this.destCanvasCtx=this.destCanvas.getContext("2d");const a=this.srcCanvas.width*this.srcCanvas.height*4*this.scalingFactor*this.scalingFactor;this.destDataBuffer=new ArrayBuffer(a),this.jobRunning=!1,this.debugFrameCount=1,this.trY=e.trY,this.trU=e.trU,this.trV=e.trV}async draw(){if(this.jobRunning)return 1;"video"===this.srcElementType&&this.srcCanvasCtx.drawImage(this.srcElement,0,0),this.jobRunning=!0;const t=this.srcCanvasCtx.getImageData(0,0,this.srcCanvas.width,this.srcCanvas.height).data.buffer;this.destDataBuffer=await this.scale(t,this.destDataBuffer);const s=new Uint8ClampedArray(this.destDataBuffer);this.destCanvas.getContext("2d").putImageData(new ImageData(s,this.destCanvas.width,this.destCanvas.height),0,0),this.jobRunning=!1}async drawContinuous(){if("video"!==this.srcElementType)for(;;)await this.draw();else{for(;this.srcElement.currentTime!==this.srcElementLastTime;)await this.draw(),this.srcElementLastTime=this.srcElement.currentTime;requestAnimationFrame(this.drawContinuous.bind(this))}}async benchmark(t){const s=performance.now();for(let s=0;s<t-1;s++)await this.draw(),this.debugDraw("Frame: "+this.debugFrameCount),this.debugFrameCount++;await this.draw();const e=performance.now(),a=t/(e-s)*1e3;this.debugDraw("Benchmark: "+t+" frames in "+((e-s)/1e3).toFixed(2)+"s. "+a.toFixed(0)+"fps average."),this.debugFrameCount=0}debugDraw(t){this.destCanvasCtx.font="bold 12px sans-serif",this.destCanvasCtx.fillStyle="black";const s=this.destCanvasCtx.measureText(t);this.destCanvasCtx.fillRect(5,5,s.width+10,22),this.destCanvasCtx.fillStyle="white",this.destCanvasCtx.fillText(t,10,22)}scale(t,s){let e=this;return new Promise((a,r)=>{XbrWasm.worker.addEventListener("message",function t(s){"complete"===s.data.status&&s.data.instanceId===e.instanceId&&(a(s.data.destData),XbrWasm.worker.removeEventListener("message",t))}),XbrWasm.worker.postMessage({instanceId:e.instanceId,srcData:t,destData:s,scalingFactor:e.scalingFactor,srcCanvasWidth:e.srcCanvas.width,srcCanvasHeight:e.srcCanvas.height,options:this.options},[t,s])})}}XbrWasm.instanceCount=0;const workerURL=document.currentScript.src.split("/").slice(0,-1).join("/")+"/XbrWasmWorker.js";XbrWasm.worker=new Worker(workerURL),XbrWasm.ready=new Promise((t,s)=>{XbrWasm.worker.addEventListener("message",function s(e){"ready"===e.data.status&&(t("ready"),XbrWasm.worker.removeEventListener("message",s))})}),XbrWasm.vibecheck=function(){var t;console.log((t=(t=>"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".indexOf(t)),"Ivor purpx! Lbh'er hfvat gur cebcevrgnel 'koe-udk-jnfz' yvoenel ol Znkvzvyyvna Ynhzrvfgre. Guvf yvoenel vf serr sbe ABAPBZZREPVNY HFR BAYL. Sbe abapbzzrepvny yvprafr qrgnvyf, naq gb chepunfr n pbzzrepvny yvprafr, cyrnfr frr uggcf://jjj.znkynhzrvfgre.pbz/koe-udk-jnfz/".split("").map(s=>t(s)>-1?"NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm"[t(s)]:s).join("")))};