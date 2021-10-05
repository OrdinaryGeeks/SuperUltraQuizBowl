using System.Threading.Tasks;
using SuperUltraQuizBowl.Api.Models;

namespace SuperUltraQuizBowl.Api.Hubs.Clients
{
    public interface IChatClient
    {
        Task ReceiveMessage(ChatMessage message);
        Task AddNewPlayer(string newPlayer);
    }
}