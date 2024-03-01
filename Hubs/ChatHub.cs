using Microsoft.AspNetCore.SignalR;

namespace SignalRChat.Hubs
{
    public class MapHub : Hub
    {
        //public async Task SendMessage(string user, string message)
        //{
        //    await Clients.All.SendAsync("ReceiveMessage", user, message);
        //}

        public async Task SendGons(string prevId, string nowId, string prevGon, string nowGon)
        {
            await Clients.All.SendAsync("GetGons", prevId, nowId, prevGon, nowGon);
        }
    }
}