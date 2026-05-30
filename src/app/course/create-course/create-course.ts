import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CourseService } from '../../services/course.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { CreateCourseRequest } from '../../interfaces/course.interface';
import { EncodeBase64Directive } from '../../directives/encode-base64';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-course',
  imports: [FormsModule, ReactiveFormsModule, EncodeBase64Directive, RouterModule],
  templateUrl: './create-course.html',
  styleUrl: './create-course.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCourse {
  private courseService = inject(CourseService);
  private fb = inject(FormBuilder);

  imagePreview = signal<string>('');

  publishForm = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    price: [0, Validators.required],
    duration: [1, Validators.required],
  });

  onFileChange(base64: string): void {
    this.imagePreview.set(`data:image/webp;base64,${base64}`);
  }

  onSubmit(): void {
    if (this.publishForm.invalid) return;

    const formValue = this.publishForm.value;

    const payload: CreateCourseRequest = {
      title: formValue.title ?? '',
      content: formValue.content ?? '',
      price: formValue.price ?? 0,
      duration: (formValue.duration ?? 0 * 60),
      imageBase64: this.imagePreview() ?? ''
    };

    this.courseService.createCourse(payload).subscribe({
      next: () => {
        console.log(payload)
        Swal.fire('Success', 'Course created successfully', 'success');
      },
      error: () => {
        Swal.fire('Error', 'Could not create course', 'error');
      }
    });
  }
}
