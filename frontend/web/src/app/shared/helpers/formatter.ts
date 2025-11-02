export class Formatter {
    public static formatDate(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    public static formatPhone(phone: string): string {
        phone = phone.replace(/\D/g, '');

        if (phone.startsWith('55')) {
            phone = phone.substring(2);
        }

        if (phone.length !== 11) {
            throw new Error('Número de telefone inválido');
        }

        const ddd = phone.substring(0, 2);
        const parte1 = phone.substring(2, 3);
        const parte2 = phone.substring(3, 7);
        const parte3 = phone.substring(7, 11);

        return `(${ddd}) ${parte1} ${parte2}-${parte3}`;
    }

    public static formatCurrency(value: number, currency: string): string {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: currency.toUpperCase(),
            minimumFractionDigits: 2
        });
    }
}