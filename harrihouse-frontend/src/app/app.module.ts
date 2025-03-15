import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // ✅ Ensure FormsModule is imported
import { AppComponent } from './app.component'; // ✅ Import AppComponent

@NgModule({
  imports: [ // ✅ Only use 'imports' for standalone components
    BrowserModule,
    FormsModule, // ✅ Add FormsModule here
    AppComponent // ✅ Import the AppComponent instead of declaring it
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
