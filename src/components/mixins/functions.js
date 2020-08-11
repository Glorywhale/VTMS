/*
function checkValidationMessage(num)
{
  if (num == undefined) num = 0;
  var errorString = '';
  var errorDiv = $('.validation-summary-errors');

  if (errorDiv.length > num)
    errorDiv = errorDiv.eq(num);
  else if (errorDiv.length == num)
    errorDiv = errorDiv.eq(num - 1);
  else
    errorDiv = errorDiv.eq(errorDiv.length - 1);

  errorDiv.hide();
  errorDiv.find('li').each(function () {
    errorString += $(this).text() + '\n';
  });

  if (errorString != '')
    alert(errorString);
}

function initCKEditor(editorName, height, bgColor, responseType) {
	if (CKEDITOR.env.ie && CKEDITOR.env.version < 9)
		CKEDITOR.tools.enableHtml5Elements(document);

	if (height)
		CKEDITOR.config.height = height;
	else
		CKEDITOR.config.height = 300;

	CKEDITOR.config.width = 'auto';
	if (bgColor)
		CKEDITOR.config.uiColor = bgColor;

	CKEDITOR.config.extraPlugins = 'font,uploadimage,colorbutton,sourcearea,justify';
	CKEDITOR.config.removePlugins = 'about';
	CKEDITOR.config.allowedContent = true;
	//CKEDITOR.config.startupMode = 'source';

	var wysiwygareaAvailable = isWysiwygareaAvailable();

	var editorElement = CKEDITOR.document.getById(editorName);

	if (wysiwygareaAvailable) {
		if (responseType) {
			CKEDITOR.replace(editorName, {
				filebrowserImageUploadUrl: '/file/uploadck?responseType=' + responseType
			});
		}
		else {
			CKEDITOR.replace(editorName, {
				filebrowserImageUploadUrl: '/file/uploadck?'
			});
		}
	} else {
		editorElement.setAttribute('contenteditable', 'true');
		CKEDITOR.inline(editorName);
	}
}

function isWysiwygareaAvailable() {
	if (CKEDITOR.revision == ('%RE' + 'V%')) {
		return true;
	}

	return !!CKEDITOR.plugins.get('wysiwygarea');
}
*/
import moment from 'moment';

export default {
  methods: {
    changeRange(range) {
      var now = new Date();
      var startDate = new Date();
      switch (range) {
        case '1Y':
          startDate.setFullYear(startDate.getFullYear() - 1);
          this.search.startDate = startDate;
          this.search.endDate = now;
          break;
        case '6M':
          startDate.setMonth(startDate.getMonth() - 6);
          this.search.startDate = startDate;
          this.search.endDate = now;
          break;
        case '3M':
          startDate.setMonth(startDate.getMonth() - 3);
          this.search.startDate = startDate;
          this.search.endDate = now;
          break;
        case '1M':
          startDate.setMonth(startDate.getMonth() - 1);
          this.search.startDate = startDate;
          this.search.endDate = now;
          break;
        case '2W':
          startDate.setDate(startDate.getDate() - 14);
          this.search.startDate = startDate;
          this.search.endDate = now;
          break;
        case '1W':
          startDate.setDate(startDate.getDate() - 7);
          this.search.startDate = startDate;
          this.search.endDate = now;
          break;
        case '5D':
          startDate.setDate(startDate.getDate() - 5);
          this.search.startDate = startDate;
          this.search.endDate = now;
          break;
        case '3D':
          startDate.setDate(startDate.getDate() - 3);
          this.search.startDate = startDate;
          this.search.endDate = now;
          break;
        case '1D':
          startDate.setDate(startDate.getDate() - 1);
          this.search.startDate = startDate;
          this.search.endDate = now;
          break;
        case '-1D':
          startDate.setDate(startDate.getDate() + 1);
          this.search.startDate = now;
          this.search.endDate = startDate;
          break;
        case '-3D':
          startDate.setDate(startDate.getDate() + 3);
          this.search.startDate = now;
          this.search.endDate = startDate;
          break;
        case '-1D1':
          startDate.setDate(startDate.getDate() + 1);
          this.search.startDate = startDate;
          this.search.endDate = startDate;
          break;
        default:
          startDate.setDate(startDate.getDate() - 7);
          this.search.startDate = startDate;
          this.search.endDate = now;
          break;
      }
    },
    downloadFile(res) {
      var fileName = res.headers['content-disposition'].split("=")[1].replace(/"/gi,'');
      var blob = new Blob([res.data], { type : 'application/octet-stream' });

      var isIE = false || !document.documentMode;
      //var isEdge = !isIE && !!window.StyleMedia;

      if (isIE) {
        window.navigator.msSaveOrOpenBlob(blob, fileName);
      }
      else {
        var url = window.URL || window.webkitURL;
        var objectUrl = url.createObjectURL(blob);
        var link = document.createElement('a');

        link.href = objectUrl;
        link.download = fileName;
        //document.body.appendChild(link); //for FireFox
        link.click();

        setTimeout(function () {
          //document.body.removeChild(link);
          url.revokeObjectURL(objectUrl);
        }, 100);
      }
    },
    clone(obj) {
      if (obj === null || typeof (obj) !== 'object')
        return obj;

      var copy = obj.constructor();

      for (var attr in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, attr)) {
          copy[attr] = obj[attr];
        }
      }

      return copy;
    },
    mediumDate(value) {
      if (value) {
        if (typeof (value) === 'object') {
          return value.toISOString().substr(0, 10);
        }
        return moment(String(value)).format('YYYY-MM-DD');
      }
    }
  }
};
