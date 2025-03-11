import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SkillUseCase } from '@/application/useCases/SkillUseCase';
import { CertificateUseCase } from '@/application/useCases/CertificateUseCase';

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

  async getDashboardSummary(_request: Request, response: Response): Promise<Response> {
    const skillUseCase = container.resolve(SkillUseCase);
    const certificateUseCase = container.resolve(CertificateUseCase);
    
    const skills = await skillUseCase.list();
    const certificates = await certificateUseCase.list();
    
    // Totais
    const totalSkills = skills.length;
    const totalCertificates = certificates.length;
    
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
    
    return response.json({
      totalSkills,
      totalCertificates,
      skillsByLevel: {
        labels: levels,
        data: skillsByLevel
      },
      certificatesByCategory: {
        labels: certCategories,
        data: certsByCategory
      },
      recentCertificates,
      topSkillCategories
    });
  }
} 