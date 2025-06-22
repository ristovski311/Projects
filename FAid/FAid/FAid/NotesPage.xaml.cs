using CommunityToolkit.Mvvm.Input;
using FAid.Services;
using FAid.ViewModel;
using System.Security.Cryptography.X509Certificates;

namespace FAid;

public partial class NotesPage : ContentPage
{
	public NotesPage(NotesViewModel vm)
	{
		InitializeComponent();
		BindingContext = vm;
		this.GetTitles();
	}

    private async void AddNotesTitleBtn_Clicked(object sender, EventArgs e)
    {
		string res = await DisplayPromptAsync("Note's Title", "Enter new Note's Title");
		if (String.IsNullOrEmpty(res))
			return;
		NotesViewModel vm = this.BindingContext as NotesViewModel;
		vm.AddNote(res);
    }

	public async void GetTitles()
	{
		var notes = await NotesService.GetNotes();
		List<string> noteTitles = new List<string>();
		foreach (var note in notes)
		{
			(this.BindingContext as NotesViewModel).NoteTitles.Add(note.Title);
        }

    }
}