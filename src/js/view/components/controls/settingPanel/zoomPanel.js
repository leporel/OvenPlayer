/**
 * Created by hoho on 2018. 7. 26..
 */
import OvenTemplate from 'view/engine/OvenTemplate';
import PanelManager from "view/global/PanelManager";
import LA$ from 'utils/likeA$';


const ZoomPanel = function($container, api, data){
    const $root = LA$(api.getContainerElement());
    let panelManager = PanelManager();

    data.setFront = function(isFront){
        if(isFront){
            $root.find("#"+data.id).removeClass("background");
        }else{
            $root.find("#"+data.id).addClass("background");
        }
    };
    const onRendered = function($current, template){
        //Do nothing
    };
    const onDestroyed = function(template){
        //Do nothing
    };
    const events = {
        "click .op-setting-item": function (event, $current, template) {
            event.preventDefault();
            let offset = LA$(event.currentTarget).attr("op-data-value");

            // console.log("Press zoom: "+offset);
            let value = document.querySelector(':root').style.getPropertyValue('--playerZoom');
            // console.log(LA$("#player").find(".op-player").get());

            // console.log(parseFloat(value));
            // console.log(value);
            if (isNaN(parseFloat(value))) {
                value = 1.0;
            }
            // console.log(value);
            // console.log("Value: "+parseFloat(value) +"; Offset: "+offset);

            if (parseFloat(offset) == 1.0){
                document.querySelector(':root').style.setProperty('--playerZoom', 1);
              } else {
                document.querySelector(':root').style.setProperty('--playerZoom', parseFloat(value) + parseFloat(offset));
              }
           
            // panelManager.clear();
        },
        "click .op-setting-title" : function(event, $current, template){
            event.preventDefault();
            panelManager.removeLastItem();
        }
    };

    return OvenTemplate($container, "ZoomPanel", api.getConfig(), data, events, onRendered, onDestroyed );

};

export default ZoomPanel;