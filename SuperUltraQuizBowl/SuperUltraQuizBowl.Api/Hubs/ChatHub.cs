using System.Threading.Tasks;
using SuperUltraQuizBowl.Api.Models;
using SuperUltraQuizBowl.Api.Hubs.Clients;
using Microsoft.AspNetCore.SignalR;

namespace SuperUltraQuizBowl.Api.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        public async Task SendMessage(ChatMessage message)
        {
            await Clients.All.ReceiveMessage(message);
        }
    }
}