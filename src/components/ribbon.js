import Util from './js/util.js'
import SystemDemo from './js/systemdemo.js'
import dialog from "../components/js/dialog.js"

//这个函数在整个wps加载项中是第一个执行的
function OnAddinLoad(ribbonUI){
    if (typeof (wps.ribbonUI) != "object"){
		wps.ribbonUI = ribbonUI
    }
    
    if (typeof (wps.Enum) != "object") { // 如果没有内置枚举值
        wps.Enum = Util.WPS_Enum
    }

    //这几个导出函数是给外部业务系统调用的
    window.openOfficeFileFromSystemDemo = SystemDemo.openOfficeFileFromSystemDemo
    window.InvokeFromSystemDemo = SystemDemo.InvokeFromSystemDemo

    wps.PluginStorage.setItem("EnableFlag", false) //往PluginStorage中设置一个标记，用于控制两个按钮的置灰
    wps.PluginStorage.setItem("ApiEventFlag", false) //往PluginStorage中设置一个标记，用于控制ApiEvent的按钮label
    return true
}

// var WebNotifycount = 0;
function OnAction(control) {
    const eleId = control.Id;
    switch (eleId) {
        case "btnShowMsg":
            {
                const doc = wps.EtApplication().ActiveWorkbook
                if (!doc) {
                    alert("当前没有打开任何文档")
                    return
                }
                alert(doc.Name) 
            }
            break;
        case "btnIsEnbable":
            {
                let bFlag = wps.PluginStorage.getItem("EnableFlag")
                wps.PluginStorage.setItem("EnableFlag", !bFlag)
                
                //通知wps刷新以下几个按饰的状态
                wps.ribbonUI.InvalidateControl("btnIsEnbable")
                wps.ribbonUI.InvalidateControl("btnShowDialog") 
                wps.ribbonUI.InvalidateControl("btnShowTaskPane") 
                //wps.ribbonUI.Invalidate(); 这行代码打开则是刷新所有的按钮状态
                break
            }
        case "btnShowDialog":
            wps.ShowDialog(Util.GetUrlPath() + "dialog", "这是一个对话框网页", 400 * window.devicePixelRatio, 400 * window.devicePixelRatio, false)
            break
        case "menued":
            {
                dialog.onbuttonclick("menued")
            }
            break
        case "btnApiEvent":
            {
                let bFlag = wps.PluginStorage.getItem("ApiEventFlag")
                let bRegister = bFlag ? false : true
                wps.PluginStorage.setItem("ApiEventFlag", bRegister)
                if (bRegister){
                    wps.ApiEvent.AddApiEventListener('NewWorkbook', 'ribbon.OnNewDocumentApiEvent')
                }
                else{
                    wps.ApiEvent.RemoveApiEventListener('NewWorkbook', 'ribbon.OnNewDocumentApiEvent')
                }
                
                wps.ribbonUI.InvalidateControl("btnApiEvent") 
            }
            break
        case "denglu":
            {
                localStorage.removeItem("token") 
                wps.ShowDialog(Util.GetUrlPath() + "login", "欢迎登录", 900 * window.devicePixelRatio, 600 * window.devicePixelRatio, false)
            }
            break
        case "logout":
            {
                localStorage.removeItem("token") 
                wps.PluginStorage.setItem("EnableFlag",!-1)
                //通知wps刷新以下几个按饰的状态
                wps.ribbonUI.InvalidateControl("menued")
                wps.ribbonUI.InvalidateControl("logout")
                wps.ribbonUI.InvalidateControl("denglu") 
            }
            break
        default:
            break
    }
    return true
}

function GetImage(control) {
    const eleId = control.Id
    switch (eleId) {
        case "btnShowMsg":
            return "images/1.svg"
        case "btnShowDialog":
            return "images/2.svg"
        case "btnShowTaskPane":
            return "images/3.svg"
        default:
    }
    return "images/newFromTemp.svg"
}

function OnGetEnabled(control) {
    const eleId = control.Id
    switch (eleId) {
        case "denglu":
            return true
        // case "btnShowDialog":
        //     {
        //         let bFlag = wps.PluginStorage.getItem("EnableFlag")
        //         return bFlag
        //     }
        case "menued":
            {
                let bFlag = wps.PluginStorage.getItem("EnableFlag")
                return bFlag
            }
        case "logout":
            {
                let bFlag = wps.PluginStorage.getItem("EnableFlag")
                return bFlag
            }
        default:
            break
    }
    return true
}

function OnGetVisible(control){
    const eleId = control.Id
    console.log(eleId)
    return true
}

function OnGetLabel(control){
    const eleId = control.Id
    switch (eleId) {
        case "denglu":
            {
                let bFlag = wps.PluginStorage.getItem("EnableFlag")
                return bFlag ?  "登录" : "注销"
            }
        case "btnApiEvent":
            {
                let bFlag = wps.PluginStorage.getItem("ApiEventFlag")
                return bFlag ? "清除新建文件事件" : "注册新建文件事件"
            }    
    }
    return ""
}

function OnNewDocumentApiEvent(doc){
    alert("新建文件事件响应，取文件名: " + doc.Name)
}


//这些函数是给wps客户端调用的
export default {
    OnAddinLoad,
    OnAction,
    GetImage,
    OnGetEnabled,
    OnGetVisible,
    OnGetLabel,
    OnNewDocumentApiEvent
};




