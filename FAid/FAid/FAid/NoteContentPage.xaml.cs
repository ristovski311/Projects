using FAid.Services;
using FAid.ViewModel;
using static Android.Icu.Text.CaseMap;

namespace FAid;
public partial class NoteContentPage : ContentPage
{
	public NoteContentPage(NoteContentViewModel vm)
	{
		InitializeComponent();
		BindingContext = vm;
	}
    private void ScrollTap_Tapped(object sender, TappedEventArgs e)
    {
        NoteText.IsEnabled = true;
        NoteText.IsVisible = true;
        NoteScroll.IsVisible = false;
    }

    private async void NoteText_Unfocused(object sender, FocusEventArgs e)
    {
        NoteText.IsEnabled = false;
        NoteText.IsVisible = false;
        NoteScroll.IsVisible = true;
        Note note = await NotesService.GetNote(Title);
        note.Description = NoteText.Text;
        NotesService.SaveNoteAsync(note);
    }
}