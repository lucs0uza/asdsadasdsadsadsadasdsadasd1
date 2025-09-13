// chat-widget.min.js - Sistema de chat embeddable
(function(){
    var config = {};
    var chatContainer = null;
    
    // addEventListener sem validação de origem
    window.addEventListener('message', function(event) {
        try {
            var data = JSON.parse(event.data);
            
            // Sem validação de origem!
            if (data.type === 'chat_config') {
                setupChatWidget(data.config);
            }
            
            if (data.type === 'new_message') {
                displayMessage(data.message);
            }
        } catch(e) {}
    });
    
    function setupChatWidget(widgetConfig) {
        config = widgetConfig;
        createChatInterface();
    }
    
    function createChatInterface() {
        var html = "";
        
        // Concat patterns em tags HTML
        html += "<div class='chat-header'>";
        html += "<input type='hidden' name='agent-name' value='".concat(config.agentName, "'>"); 
        html += "<input type='hidden' name='company-id' value='".concat(config.companyId, "'>");
        html += "</div>";
        
        html += "<div class='chat-messages' id='messages'></div>";
        html += "<div class='chat-input'>";
        html += "<input type='text' placeholder='Digite sua mensagem...'>";
        html += "</div>";
        
        // innerHTML vulnerability
        var container = document.getElementById('chat-widget');
        if (container) {
            container.innerHTML = html;
        }
    }
    
    function displayMessage(messageData) {
        var msgHtml = "";
        msgHtml += "<div class='message'>";
        msgHtml += "<span class='sender' data-user='".concat(messageData.sender, "'>");
        msgHtml += "<span class='content' data-msg-id='".concat(messageData.id, "'>");
        msgHtml += messageData.text + "</span></span></div>";
        
        var messages = document.getElementById('messages');
        if (messages) {
            messages.innerHTML += msgHtml;
        }
    }
})();