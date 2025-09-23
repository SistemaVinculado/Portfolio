import { Injectable, signal } from '@angular/core';
import { CaseStudy } from '../models/case-study.model';
import { caseStudiesData } from '../data/case-studies.data';

@Injectable({
  providedIn: 'root'
})
export class CaseStudyService {
  private readonly caseStudies = signal<CaseStudy[]>(caseStudiesData);

  getCaseStudies(): CaseStudy[] {
    return this.caseStudies();
  }

  getCaseStudyBySlug(slug: string): CaseStudy | undefined {
    return this.caseStudies().find(study => study.slug === slug);
  }
}
