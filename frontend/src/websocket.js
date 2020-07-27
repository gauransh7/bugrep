class WebSocketService {
    static instance = null;
    callbacks = {};

    static getInstance() {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    constructor() {
        this.socketRef = null;
    }

    connect(bugId, token) {
        const path = "ws://"+'localhost:8000'+'/ws/comment/'+bugId+'/'+token+'/';
        this.socketRef = new WebSocket(path);
        this.socketRef.onopen = () => {
            console.log("WebSocket open");
        };
        this.socketNewComment(JSON.stringify({
            command: 'fetch_comments'
        }))
        this.socketRef.onmessage  = e => {
            this.socketNewComment(e.data);
        };
        this.socketRef.onerror = e => {
            console.log(e.message);
        };
        this.socketRef.onclose = () => {
            console.log("WebSocket closed let's reopen");
            this.connect(bugId, token);
        };
    }

    disconnect() {
        this.socketRef.close();
    }

    socketNewComment(data) {
        const parsedData = JSON.parse(data);
        const command = parsedData.command;
        if (Object.keys(this.callbacks).length === 0) {
            return;
        }
        if (command === "comments") {
            this.callbacks[command](parsedData.comments);
        }
        if (command === "new_comment") {
            this.callbacks[command](parsedData.comment);
        }
        if (command === "like") {
            this.callbacks[command](parsedData.comment);
        }
    }

    fetchComments() {
        this.sendComment({
            command: "fetch_comments"
        });
    }

    newComment(comment) {
        this.sendComment({
            command: "new_comment",
            reply: comment.reply,
            description: comment.description
        });
    }

    likeComment(id, status) {
        this.sendComment({
            command: "like_comment",
            commentId: id,
            status
        });
    }

    addCallbacks(commentsCallback, newCommentCallback, likeCommentCallback) {
        this.callbacks["comments"] = commentsCallback;
        this.callbacks["new_comment"] = newCommentCallback;
        this.callbacks["like"] = likeCommentCallback;
    }

    sendComment(data) {
        try {
            this.socketRef.send(JSON.stringify({ ...data }));
        } catch (err) {
            console.log(err.message);
        }
    }

    state() {
        return this.socketRef.readyState;
    }
}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;