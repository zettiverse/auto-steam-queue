 // ==UserScript==
 // @name            Auto Steam Discovery Queue
 // @namespace       http://steamcommunity.com/id/zetx/
 // @description     Go to next game queued as soon as page is done loading.
 // @include         http://store.steampowered.com/app/*
 // @include         http://store.steampowered.com/explore/*
 // @include         http://store.steampowered.com/agecheck/app/*
 // @version         1.1
 // @run-at          document-end
 // @grant           none
 // ==/UserScript==

/*

Thanks

* http://stackoverflow.com/a/13734859
* /u/curseknight ( Automatically load new queue, agecheck submissions )

*/


function GM_main() {
    window.onload = function () {
    
        var path = window.location.pathname.split('/')[1];
        
        switch(path) {
            case 'explore':
                $J.post( 'http://store.steampowered.com/explore/generatenewdiscoveryqueue', {
                 sessionid: g_sessionID,
                 queuetype: this.m_eQueueType,
                }).done( function ( data ) {
                window.location = 'http://store.steampowered.com/explore/next';
                $J('#refresh_queue_btn').html("<span>Starting another queue.</span>");
                }).fail( function() {
                ShowAlertDialog( 'Start another queue >>', 'There was a problem saving your preferences.  Please try again later.' );
                $J('#refresh_queue_btn').html("<span>Start another queue >></span>");
                } );
                
                break;
            
            case 'agecheck':
               $("span:contains('Enter')");
               jQuery('#ageYear').val (1915).trigger ('change');
               DoAgeGateSubmit();
               
               break;
               
            case 'app':
            default:
               $J('.queue_sub_text').text("Loading next in queue");
               $J('#next_in_queue_form').submit();
               
               break;
        }

    }
}

 addJS_Node(null, null, GM_main);

 //-- This is a standard-ish utility function:
 function addJS_Node(text, s_URL, funcToRun, runOnLoad) {
   var D                                   = document;
   var scriptNode                          = D.createElement ('script');
   if (runOnLoad) {
    scriptNode.addEventListener ("load", runOnLoad, false);
   }
   scriptNode.type                         = "text/javascript";
   if (text)       scriptNode.textContent  = text;
   if (s_URL)      scriptNode.src          = s_URL;
   if (funcToRun)  scriptNode.textContent  = '(' + funcToRun.toString() + ')()';

   var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
   targ.appendChild (scriptNode);
 }