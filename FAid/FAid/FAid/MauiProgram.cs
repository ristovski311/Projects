using FAid.ViewModel;
using Microsoft.Extensions.Logging;

namespace FAid
{
    public static class MauiProgram
    {
        public static MauiApp CreateMauiApp()
        {
            var builder = MauiApp.CreateBuilder();
            builder
                .UseMauiApp<App>()
                .ConfigureFonts(fonts =>
                {
                    fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                    fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
                });
            builder.Services.AddSingleton<MainPage>();
            builder.Services.AddSingleton<MainViewModel>();

            builder.Services.AddTransient<NotesPage>();
            builder.Services.AddTransient<NotesViewModel>();

            builder.Services.AddTransient<NoteContentPage>();
            builder.Services.AddTransient<NoteContentViewModel>();

            builder.Services.AddTransient<CalendarMonthsPage>();
            builder.Services.AddTransient<CalendarMonthsViewModel>();

            builder.Services.AddTransient<CalendarDetailPage>();
            builder.Services.AddTransient<CalendarDetailViewModel>();
#if DEBUG
            builder.Logging.AddDebug();
#endif

            return builder.Build();
        }
    }
}
