var _memberMenus = document.getElementsByTagName('button');
var _confirmed = false;
var _i = 0;
var _f = 0;
var _resetAttempted = false;
var _waitCount = 0;
 
function clickMemberMenu() {
    if (typeof(_memberMenus[_f]) !== 'undefined' && _memberMenus[_f].getAttribute('aria-label') == 'Member Settings') {
        _resetAttempted = false;
         
        console.log(_memberMenus[_f].getAttribute('data-testid'));

        _memberMenus[_f].click();
         
        setTimeout(getAnchorsForMember, 1000);
    }else{
        _f++;
         
        if (_memberMenus.length > _f) {
            clickMemberMenu();
        }else if (_resetAttempted) {
            console.log('Stopping 1');
        }else{
            setTimeout(resetAndStartAgain(), 1000);
        }
    }
}
 
function getAnchorsForMember() {
    if (document.querySelector(".uiContextualLayerPositioner.uiLayer:not(.hidden_elem)") &&
        document.querySelector(".uiContextualLayerPositioner.uiLayer:not(.hidden_elem)").querySelector('[data-testid="leave_group"]') &&
        document.querySelector(".uiContextualLayerPositioner.uiLayer:not(.hidden_elem)").querySelector('[data-testid="leave_group"]').textContent == 'Remove from Group') {
         
        document.querySelector(".uiContextualLayerPositioner.uiLayer:not(.hidden_elem)").querySelector('[data-testid="leave_group"]').click();
        console.log('clicked');
        setTimeout(waitForConfirmationButton, 1000);
    } else if (document.querySelector("a.uiMorePagerPrimary")) {
        document.querySelector("a.uiMorePagerPrimary").click();
        console.log('reloading');
        setTimeout(finishedAnchor(), 1000);
    }
    else{
        console.log('No link for member');
        _f++;
         
        if (_memberMenus.length > _f) {
            clickMemberMenu();
        }else{
            setTimeout(resetAndStartAgain(), 1000);
        }
    }
}
 
function confirmRemoval() {
    if (document.querySelector(".uiLayer:not(.hidden_elem)") && document.querySelector(".uiLayer:not(.hidden_elem)").querySelector('.layerConfirm')) {
        document.querySelector(".uiLayer:not(.hidden_elem)").querySelector('.layerConfirm').click();
        //document.querySelector(".uiLayer:not(.hidden_elem)").querySelector('.layerCancel').click();

        _confirmed = true;
         
        console.log('confirmed');
         
        setTimeout(confirmRemoval, 1000);
    }
}

function waitForConfirmationButton() {
    if (document.querySelector(".uiLayer a.autofocus.layerCancel")) {
        document.querySelector(".uiLayer a.autofocus.layerCancel").click();
        console.log('error');
         
        setTimeout(finishedAnchor, 1000);
    } else if (document.querySelector(".uiLayer:not(.hidden_elem)") && document.querySelector(".uiLayer:not(.hidden_elem)").querySelector('.layerConfirm')) {
        confirmRemoval();
        setTimeout(finishedAnchor, 1000);
    }else if (_waitCount < 5){
        _waitCount++;
        console.log('waiting');
        setTimeout(waitForConfirmationButton, 1000);
    }else{
        console.log('reset');
        setTimeout(finishedAnchor, 1000);
    }
}
 
function finishedAnchor() {
    _waitCount = 0;
    _confirmed = false;
    checkForNextMember();
}
 
function checkForNextMember() {
    _f++;
     
    if (_memberMenus.length > _f) {
        clickMemberMenu();
    }else{
        resetAndStartAgain();
    }
}
 
function resetAndStartAgain() {
    console.log('reset and start again');
     
    _i = 0;
    _f = 0;
    _resetAttempted = true;
    _memberMenus = document.getElementsByTagName('button');
     
    if (_memberMenus.length > _f) {
        clickMemberMenu();
    }else{
        console.log('Stopping 2');
    }
}
 
if (_memberMenus.length > _f) {
    console.log(_memberMenus.length);
    clickMemberMenu();
}else{
    console.log('Stopping 3');
}
