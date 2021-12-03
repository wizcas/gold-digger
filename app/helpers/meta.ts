import { MetaFunction } from 'remix';

export function generateMeta(subtitle?: string): MetaFunction {
  return () => {
    return {
      title: ['私房钱大作战', subtitle].filter(Boolean).join(' - '),
      description: '无所遁形无处安放',
    };
  };
}
