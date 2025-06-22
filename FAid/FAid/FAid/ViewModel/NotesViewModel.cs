using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using FAid.Services;
using System.Collections.ObjectModel;

namespace FAid.ViewModel;

public partial class NotesViewModel : ObservableObject
{
    [ObservableProperty]
    string noteText;

    [ObservableProperty]
    public ObservableCollection<string> noteTitles;

    [ObservableProperty]
    public ObservableCollection<Note> notes;

    public NotesViewModel() { 
       noteTitles= new ObservableCollection<string>();
       
    }
    public void AddNote(string t)
    {
        noteTitles.Add(t);
        NotesService.AddNote(t, string.Empty, DateTime.Now);

    }

    [RelayCommand]
    public async Task Tap(string s)
    {
        Note note = await NotesService.GetNote(s);
        if (note == null)
            return;
        await Shell.Current.GoToAsync($"{nameof(NoteContentPage)}?Title={s}&Description={note.Description}");
    }

    [RelayCommand]
    public async void RemoveNote(string t)
    {
        if (!noteTitles.Contains(t))
            return;
        noteTitles.Remove(t);
        NotesService.RemoveNote((await NotesService.GetNote(t)).Id);
    }
}
