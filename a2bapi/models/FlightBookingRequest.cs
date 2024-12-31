namespace a2bapi.Models 
{
    public class FlightBookingRequest
    {
        public string? FlightName { get; set; }
        public string? DepartureTime { get; set; }
        public string? ArrivalTime { get; set; }
        public string? FlightDate { get; set; }
        public string? DepartureIata { get; set; }
        public string? ArrivalIata { get; set; }
        public int NumTickets { get; set; }
        public double TotalCost { get; set; }
    }

}
