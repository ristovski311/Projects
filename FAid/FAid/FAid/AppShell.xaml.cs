namespace FAid
{
    public partial class AppShell : Shell
    {
        public AppShell()
        {
            InitializeComponent();
            Routing.RegisterRoute(nameof(NotesPage), typeof(NotesPage));
            Routing.RegisterRoute(nameof(NoteContentPage), typeof(NoteContentPage));
            Routing.RegisterRoute(nameof(CalendarMonthsPage), typeof(CalendarMonthsPage));
            Routing.RegisterRoute(nameof(CalendarDetailPage), typeof(CalendarDetailPage));
        }
    }
}
