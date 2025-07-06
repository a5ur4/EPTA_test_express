class TokenBlacklist {
    private blacklistedTokens: Set<string> = new Set();

    addToken(token: string): void {
        this.blacklistedTokens.add(token);
    }

    isTokenBlacklisted(token: string): boolean {
        return this.blacklistedTokens.has(token);
    }

    getSize(): number {
        return this.blacklistedTokens.size;
    }
}

export const tokenBlacklist = new TokenBlacklist();
