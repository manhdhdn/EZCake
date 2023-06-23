namespace EZCake.Momo
{
    public partial class MomoRequestModel
    {
        public MomoRequestModel()
        {
        }

        public string Endpoint { get; set; } = null!;
        public string PostJsonString { get; set; } = null!;
    }
}
