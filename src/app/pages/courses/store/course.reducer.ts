import { createReducer, on } from '@ngrx/store';
import { Course } from 'src/app/interfaces/courses.interface';
import * as CourseActions from './course.actions';
export const courseFeatureKey = 'course';

export interface State {
  data: Course[]
}
export const initialState: State = {
  data: []
};
export const reducer = createReducer(
  initialState,
  on(CourseActions.loadCourses, state => state),
  on(CourseActions.loadCoursesSuccess, (state, action) => {
    return {...state, data: action.data }
  }),
  on(CourseActions.loadCoursesFailure, (state, action) => state),
);
