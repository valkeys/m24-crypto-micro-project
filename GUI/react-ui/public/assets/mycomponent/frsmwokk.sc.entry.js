/*! Built with http://stenciljs.com */
const{h:t}=window.mycomponent;class e{render(){return[t("span",{class:"sec"}," ",this.base),t("div",{class:"alert alert-primary",role:"alert"},"A simple primary alert—check it out!")]}static get is(){return"symbol-label"}static get encapsulation(){return"shadow"}static get properties(){return{base:{type:String,attr:"base"}}}static get style(){return".sec.sc-symbol-label{color:red}"}}export{e as SymbolLabel};