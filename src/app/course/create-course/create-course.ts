import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CourseService } from '../../services/course.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-course',
  imports: [FormsModule],
  templateUrl: './create-course.html',
  styleUrl: './create-course.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCourse {
  private courseService = inject(CourseService);

  form = {
    title: '',
    content: '',
    price: 0,
    durationHours: 1,
    imageBase64: ''
  };

  onFileChange(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      this.form.imageBase64 = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  submit() {

    if (!this.form.title || !this.form.content) {
      Swal.fire('Error', 'Fill required fields', 'error');
      return;
    }

    const payload = {
      title: this.form.title,
      content: this.form.content,
      price: this.form.price,
      duration: this.form.durationHours * 60,
      imageBase64: this.form.imageBase64
    };

    this.courseService.createCourse(payload).subscribe({
      next: () => {
        Swal.fire('Success', 'Course created successfully', 'success');

        this.form = {
          title: '',
          content: '',
          price: 0,
          durationHours: 1,
          imageBase64: ''
        };
      },
      error: () => {
        Swal.fire('Error', 'Could not create course', 'error');
      }
    });
  }
}
