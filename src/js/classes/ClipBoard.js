class ClipBoard {
    static COPY_COMMAND = 'copy'

    static support(text) {
        if (typeof text !== "string") {
            throw new TypeError('Type must be String')
        }

        return true
    }

    static copy(text) {
        ClipBoard.support(text);

        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select()
        document.execCommand(ClipBoard.COPY_COMMAND)
        el.remove()
    }
}

class ClipBoardElement {
    static NOTIFICATION_TEXT = 'Text Copied';
    static NOTIFICATION_CLASS = 'cbe-notify-8a5s6gtr1';
    static NOTFICATION_TIME = 600;

    constructor(element) {
        this.element = element
    }

    listenToCopy(eventName) {
        const listener = function (event) {
            const el = this.element;
            ClipBoard.copy(ClipBoardElement.getElementText(el))
            ClipBoardElement.notify(el)
        }

        this.element.addEventListener(eventName, listener.bind(this), false)
    }

    static notify(element) {
        const oldNotify = element.querySelector(`.${ClipBoardElement.NOTIFICATION_CLASS}`)
        if (oldNotify) {
         oldNotify.remove()
        }

        const notify = DOMManager.newElement(
            'div',
            ClipBoardElement.NOTIFICATION_TEXT,
            element,
            ClipBoardElement.NOTIFICATION_CLASS
        )

        element.style.position = 'relative';

        notify.style.transition = "all 0.5 ease";
        notify.style.position = 'absolute'
        notify.style.top = '50%';
        notify.style.left = '50%';
        notify.style.transform = 'translate(-50%, -50%)';
        notify.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        notify.style.padding = "5px";
        notify.style.color = "white";
        notify.style.borderRadius = "5px";
        notify.style.textAlign = 'center';
        notify.style.width = 'auto';
        notify.style.whiteSpace = 'nowrap'

        setTimeout(function (element, parent) {
            element.remove()
        }, ClipBoardElement.NOTFICATION_TIME, notify, element)
    }

    static getElementText(element) {
        return element.textContent
    }

    static listenAllToCopy(eventName, elements, classes = false) {
        if (classes) {
            elements = document.querySelectorAll(elements)
        }

        for (let element of elements) {
            new ClipBoardElement(element).listenToCopy(eventName);
        }
    }
}
