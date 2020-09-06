using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System;

namespace TestWebApp
{
    public class MessageHub : Hub {

        public async Task SendMessageToAll(string message) {
            
            await Clients.All.SendAsync("ReceiveMessage", message);
            
        }

        public async Task SendMessageToCaller(string message){
            await Clients.Caller.SendAsync("ReceiveMessage", message);
        }

        public override async Task OnConnectedAsync() {
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception ex) {
            await base.OnDisconnectedAsync(ex);
        }

    }
    
}