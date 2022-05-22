var filetypes= [
    {EXTN : "PDF", CONTENT_TYPE:'application/pdf'},
    {EXTN : "XLSX", CONTENT_TYPE:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'},
    {EXTN : "DOC", CONTENT_TYPE:'application/msword'},
    {EXTN : "DOCX", CONTENT_TYPE:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'},
    {EXTN : "XLS", CONTENT_TYPE:'application/vnd.ms-excel'},
    {EXTN : "XLSX", CONTENT_TYPE:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'},
    {EXTN : "PPT", CONTENT_TYPE:'application/vnd.ms-powerpoint'},
    {EXTN : "PPTX", CONTENT_TYPE:'application/vnd.openxmlformats-officedocument.presentationml.presentation'},
    {EXTN : "GIF", CONTENT_TYPE:'image/gif'},
    {EXTN : "JPEG", CONTENT_TYPE:'image/jpeg'},
    {EXTN : "PNG", CONTENT_TYPE:'image/png'},
    {EXTN : "JPG", CONTENT_TYPE:'image/jpeg'},
    {EXTN : "TXT", CONTENT_TYPE:'text/plain'},
    {EXTN : "MP4", CONTENT_TYPE:'video/mp4'},
    {EXTN : "MP3", CONTENT_TYPE:'audio/mp3'},
    {EXTN : "MP4A", CONTENT_TYPE:'audio/mp4'},
    {EXTN : "M4A", CONTENT_TYPE:'audio/mp4'},
    {EXTN : "M4V", CONTENT_TYPE:'video/x-m4v'},
    {EXTN : "F4V", CONTENT_TYPE:'video/x-f4v'},
    {EXTN : "F4A", CONTENT_TYPE:'audio/x-f4a'},
    {EXTN : "M4B", CONTENT_TYPE:'audio/mp4'},
    {EXTN : "M4P", CONTENT_TYPE:'audio/mp4'},
    {EXTN : "M4R", CONTENT_TYPE:'audio/mp4'},
    {EXTN : "F4B", CONTENT_TYPE:'audio/x-f4a'},
    {EXTN : "AVI", CONTENT_TYPE:'video/x-msvideo'},
    {EXTN : "MOV", CONTENT_TYPE:'video/quicktime'},
    {EXTN : "QT",  CONTENT_TYPE:'video/quicktime'},
    {EXTN : "MOVE", CONTENT_TYPE:'video/x-sgi-movie'},
    {EXTN : "3GP", CONTENT_TYPE:'video/3gpp'},
    {EXTN : "3GP2", CONTENT_TYPE:'video/3gpp2'},
    {EXTN : "3G2", CONTENT_TYPE:'video/3gpp'},
    {EXTN : "3GPP", CONTENT_TYPE:'video/3gpp'},
    {EXTN : "3GPP2", CONTENT_TYPE:'video/3gpp2'},
    {EXTN : "OGG", CONTENT_TYPE:'application/ogg'},
    {EXTN : "OGA", CONTENT_TYPE:'audio/ogg'},
    {EXTN : "OGV", CONTENT_TYPE:'video/ogg'},
    {EXTN : "OGX", CONTENT_TYPE:'application/ogg'},
    {EXTN : "WMV", CONTENT_TYPE:'video/x-ms-wmv'},
    {EXTN : "WMA", CONTENT_TYPE:'audio/x-ms-wma'},
    {EXTN : "ASF", CONTENT_TYPE:'video/x-ms-asf'},    
    {EXTN : "ZIP", CONTENT_TYPE:'application/zip'},    
    {EXTN : "RAR", CONTENT_TYPE:'application/x-rar-compressed'}
]
var bytesToSize = (bytes)=> {
    return (bytes / 1048576).toFixed(3) + " MB";
}
var getFileTypeImage = (file_name) =>{
    let nameSplit = file_name.split('.');
    let extn = nameSplit[nameSplit.length - 1];
    if (extn == "gif" || extn == "jpeg" || extn == "png" || extn == "jpg" || extn == "GIF" || extn == "JPEG" || extn == "PNG" || extn == "JPG") {               
            return `${__basedir}/img/icons/img-thumbnail.png`
    }else if(extn == "xlsx" || extn == "xls"){
        return `${__basedir}/img/icons/excel-thumbnail.png`
    }else if(extn == "doc" || extn == "docx"){
        return `${__basedir}/img/icons/word-thumbnail.jpg`
    }else if(extn == "ppt"){
        return `${__basedir}/img/icons/ppt-thumbnail.png`
    }else if(extn =='pdf'){
        return `${__basedir}/img/icons/PDF-thumbnail.png`
    }else if(extn =='mp4' || extn =='m4a' || extn =='m4v' || extn =='f4v' || extn =='f4a' || extn =='m4b'||extn =='m4r'||extn =='f4b'||extn =='mov'||extn =='3gp'||extn =='3gp2'||extn =='3g2'||extn =='3gpp'||extn =='3gpp2'||extn =='ogg'||extn =='oga'||extn =='ogv'||extn =='ogx'||extn =='wmv'||extn =='wma'||extn =='asf*'){
        return `${__basedir}/img/icons/video-thumbnail.jpg`
    }else{
        return `${__basedir}/img/icons/unknown-thumb.png`
    }
}
module.exports ={
    filetypes,
    getFileTypeImage,
    bytesToSize
}