using System.ComponentModel.DataAnnotations;

namespace FinalExam413_Dallen_Openshaw.API.Models
{
    public class Engagement
    {
        [Key]  // 👈 This is required
        public int EngagementNumber { get; set; }

        public string? StartDate { get; set; }
        public string? EndDate { get; set; }
        public string? StartTime { get; set; }
        public string? StopTime { get; set; }
        public decimal? ContractPrice { get; set; }
        public int CustomerID { get; set; }
        public int AgentID { get; set; }
        public int EntertainerID { get; set; }
    }
}
