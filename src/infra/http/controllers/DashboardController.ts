import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SkillUseCase } from '@/application/useCases/SkillUseCase';
import { CertificateUseCase } from '@/application/useCases/CertificateUseCase';
import { EducationUseCase } from '@/application/useCases/EducationUseCase';
import { ExperienceUseCase } from '@/application/useCases/ExperienceUseCase';

export class DashboardController {
  async getSkillsByCategory(_request: Request, response: Response): Promise<Response> {
    const skillUseCase = container.resolve(SkillUseCase);
    const skills = await skillUseCase.list();
    
    // Organizando por categoria
    const categories = [...new Set(skills.map(skill => skill.category))];
    const counts = categories.map(category => 
      skills.filter(skill => skill.category === category).length
    );
    
    return response.json({
      categories,
      counts
    });
  }

  async getSkillsByLevel(_request: Request, response: Response): Promise<Response> {
    const skillUseCase = container.resolve(SkillUseCase);
    const skills = await skillUseCase.list();
    
    // Organizando por nível
    const levels = ['Básico', 'Intermediário', 'Avançado'];
    const counts = levels.map(level => 
      skills.filter(skill => skill.level === level).length
    );
    
    return response.json({
      levels,
      counts
    });
  }

  async getSkillsRadarData(_request: Request, response: Response): Promise<Response> {
    const skillUseCase = container.resolve(SkillUseCase);
    const skills = await skillUseCase.list();
    
    // Categorias para o gráfico radar
    const categories = [...new Set(skills.map(skill => skill.category))];
    
    // Contando habilidades por nível em cada categoria
    const basicCounts = categories.map(category => 
      skills.filter(skill => skill.category === category && skill.level === 'Básico').length
    );
    
    const intermediateCounts = categories.map(category => 
      skills.filter(skill => skill.category === category && skill.level === 'Intermediário').length
    );
    
    const advancedCounts = categories.map(category => 
      skills.filter(skill => skill.category === category && skill.level === 'Avançado').length
    );
    
    return response.json({
      categories,
      basicCounts,
      intermediateCounts,
      advancedCounts
    });
  }

  async getCertificatesByCategory(_request: Request, response: Response): Promise<Response> {
    const certificateUseCase = container.resolve(CertificateUseCase);
    const certificates = await certificateUseCase.list();
    
    // Organizando por categoria
    const categories = [...new Set(certificates.map(cert => cert.category))];
    const counts = categories.map(category => 
      certificates.filter(cert => cert.category === category).length
    );
    
    return response.json({
      categories,
      counts
    });
  }

  async getCertificatesByPlatform(_request: Request, response: Response): Promise<Response> {
    const certificateUseCase = container.resolve(CertificateUseCase);
    const certificates = await certificateUseCase.list();
    
    // Organizando por plataforma
    const platforms = [...new Set(certificates.map(cert => cert.platform))];
    const counts = platforms.map(platform => 
      certificates.filter(cert => cert.platform === platform).length
    );
    
    return response.json({
      platforms,
      counts
    });
  }

  async getCertificatesTimeline(_request: Request, response: Response): Promise<Response> {
    const certificateUseCase = container.resolve(CertificateUseCase);
    const certificates = await certificateUseCase.list();
    
    // Organizando por data (semestralmente)
    const timelinePeriods = [
      '2020-01', '2020-06', '2021-01', '2021-06', 
      '2022-01', '2022-06', '2023-01', '2023-06', '2024-01'
    ];
    
    const counts = timelinePeriods.map(period => {
      const [year, month] = period.split('-').map(Number);
      const startDate = new Date(year, month - 1, 1);
      const endDate = month === 1 
        ? new Date(year, 5, 30) 
        : new Date(year + 1, 0, 31);
      
      return certificates.filter(cert => {
        const certDate = new Date(cert.date);
        return certDate >= startDate && certDate <= endDate;
      }).length;
    });
    
    return response.json({
      timeline: timelinePeriods,
      counts
    });
  }

  async getExperienceTimeline(_request: Request, response: Response): Promise<Response> {
    const experienceUseCase = container.resolve(ExperienceUseCase);
    const experiences = await experienceUseCase.list();
    
    // Organizando por período (agrupando por ano de início)
    const experiencesWithYear = experiences.map(exp => {
      const startYear = exp.period.split(' - ')[0];
      return { ...exp, startYear };
    });
    
    // Ordenando por ano de início e agrupando
    const experiencesByYear = [...new Set(experiencesWithYear.map(exp => exp.startYear))]
      .sort()
      .map(year => {
        const count = experiencesWithYear.filter(exp => exp.startYear === year).length;
        return { year, count };
      });
    
    return response.json({
      years: experiencesByYear.map(e => e.year),
      counts: experiencesByYear.map(e => e.count)
    });
  }

  async getExperienceByCompany(_request: Request, response: Response): Promise<Response> {
    const experienceUseCase = container.resolve(ExperienceUseCase);
    const experiences = await experienceUseCase.list();
    
    // Agrupando por empresa
    const companies = [...new Set(experiences.map(exp => exp.company))];
    const counts = companies.map(company => 
      experiences.filter(exp => exp.company === company).length
    );
    
    return response.json({
      companies,
      counts
    });
  }

  async getEducationByInstitution(_request: Request, response: Response): Promise<Response> {
    const educationUseCase = container.resolve(EducationUseCase);
    const educations = await educationUseCase.list();
    
    // Agrupando por instituição
    const institutions = [...new Set(educations.map(edu => edu.institution))];
    const counts = institutions.map(institution => 
      educations.filter(edu => edu.institution === institution).length
    );
    
    return response.json({
      institutions,
      counts
    });
  }

  async getEducationTimeline(_request: Request, response: Response): Promise<Response> {
    const educationUseCase = container.resolve(EducationUseCase);
    const educations = await educationUseCase.list();
    
    // Organizando por período (agrupando por ano de início)
    const educationsWithYear = educations.map(edu => {
      const startYear = edu.period.split(' - ')[0];
      return { ...edu, startYear };
    });
    
    // Ordenando por ano de início e agrupando
    const educationsByYear = [...new Set(educationsWithYear.map(edu => edu.startYear))]
      .sort()
      .map(year => {
        const count = educationsWithYear.filter(edu => edu.startYear === year).length;
        return { year, count };
      });
    
    return response.json({
      years: educationsByYear.map(e => e.year),
      counts: educationsByYear.map(e => e.count)
    });
  }

  async getDashboardSummary(_request: Request, response: Response): Promise<Response> {
    const skillUseCase = container.resolve(SkillUseCase);
    const certificateUseCase = container.resolve(CertificateUseCase);
    const educationUseCase = container.resolve(EducationUseCase);
    const experienceUseCase = container.resolve(ExperienceUseCase);
    
    const skills = await skillUseCase.list();
    const certificates = await certificateUseCase.list();
    const educations = await educationUseCase.list();
    const experiences = await experienceUseCase.list();
    
    // Totais
    const totalSkills = skills.length;
    const totalCertificates = certificates.length;
    const totalEducations = educations.length;
    const totalExperiences = experiences.length;
    
    // Habilidades por nível
    const levels = ['Básico', 'Intermediário', 'Avançado'];
    const skillsByLevel = levels.map(level => 
      skills.filter(skill => skill.level === level).length
    );
    
    // Certificados por categoria
    const certCategories = [...new Set(certificates.map(cert => cert.category))];
    const certsByCategory = certCategories.map(category => 
      certificates.filter(cert => cert.category === category).length
    );
    
    // Certificados recentes (últimos 2)
    const recentCertificates = certificates
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 2)
      .map(cert => ({
        name: cert.name,
        date: cert.date
      }));
    
    // Top habilidades por categoria
    const skillCategories = [...new Set(skills.map(skill => skill.category))];
    const topSkillCategories = skillCategories
      .map(category => {
        const count = skills.filter(skill => skill.category === category).length;
        return { name: category, count };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 2);
    
    // Experiências recentes (últimas 2)
    const recentExperiences = experiences
      .sort((a, b) => {
        const aStartYear = parseInt(a.period.split(' - ')[0]);
        const bStartYear = parseInt(b.period.split(' - ')[0]);
        return bStartYear - aStartYear;
      })
      .slice(0, 2)
      .map(exp => ({
        role: exp.role,
        company: exp.company,
        period: exp.period
      }));
    
    // Educação - últimas formações (2)
    const recentEducations = educations
      .sort((a, b) => {
        const aStartYear = parseInt(a.period.split(' - ')[0]);
        const bStartYear = parseInt(b.period.split(' - ')[0]);
        return bStartYear - aStartYear;
      })
      .slice(0, 2)
      .map(edu => ({
        title: edu.title,
        institution: edu.institution,
        period: edu.period
      }));
    
    return response.json({
      totalSkills,
      totalCertificates,
      totalEducations,
      totalExperiences,
      skillsByLevel: {
        labels: levels,
        data: skillsByLevel
      },
      certificatesByCategory: {
        labels: certCategories,
        data: certsByCategory
      },
      recentCertificates,
      topSkillCategories,
      recentExperiences,
      recentEducations
    });
  }
} 