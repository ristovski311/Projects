using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;

namespace FAid.ViewModel;

public partial class MainViewModel : ObservableObject
{
    [RelayCommand]
    async Task GoToNotes()
    {
        await Shell.Current.GoToAsync(nameof(NotesPage));
    }
    [RelayCommand]
    async Task GoToCalendar()
    {
        await Shell.Current.GoToAsync(nameof(CalendarMonthsPage));
    }
}
